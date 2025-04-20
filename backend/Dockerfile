# Stage 1: build the Rust application
FROM rust:1.86-slim as builder

# Install build dependencies
RUN apt-get update && apt-get install -y \
    pkg-config \
    libssl-dev \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Cache dependencies
COPY Cargo.toml Cargo.lock ./
RUN cargo fetch --locked

# Copy source and migrations
COPY . .

# Build release binary
RUN cargo build --release

# Install sqlx-cli for runtime migrations
RUN cargo install sqlx-cli --no-default-features --features postgres

# Stage 2: runtime image
FROM rust:1.86-slim as runtime

# Install runtime deps and PostgreSQL client
RUN apt-get update && apt-get install -y \
    libssl-dev \
    ca-certificates \
    postgresql-client \
  && rm -rf /var/lib/apt/lists/*

# Copy the compiled binary and sqlx CLI
COPY --from=builder /app/target/release/rust_mindset_backend /usr/local/bin/
COPY --from=builder /usr/local/cargo/bin/sqlx /usr/local/bin/

# Copy migrations and wait script
COPY --from=builder /app/migrations /app/migrations
COPY wait-for-db.sh /usr/local/bin/wait-for-db.sh
RUN chmod +x /usr/local/bin/wait-for-db.sh

# Create unprivileged user
RUN useradd -m appuser
USER appuser
WORKDIR /home/appuser

EXPOSE 8000
ENTRYPOINT ["/usr/local/bin/wait-for-db.sh"]
CMD ["rust_mindset_backend"]
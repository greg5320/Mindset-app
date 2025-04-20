# Stage 1: Build the Rust application
FROM rust:1.86-slim as builder

# Install build dependencies
RUN apt-get update && apt-get install -y \
    pkg-config \
    libssl-dev \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy manifest and source
COPY Cargo.toml Cargo.lock ./
COPY src ./src
COPY migrations ./migrations

# Build release binary
RUN cargo build --release

# Install SQLx CLI for runtime migrations
RUN cargo install sqlx-cli --no-default-features --features postgres

# Stage 2: Runtime image
FROM rust:1.86-slim as runtime

# Install runtime dependencies
RUN apt-get update && apt-get install -y \
    libssl-dev \
    ca-certificates \
    postgresql-client \
    netcat-openbsd \
  && rm -rf /var/lib/apt/lists/*

# Copy binary and SQLx CLI
COPY --from=builder /app/target/release/rust_mindset_backend /usr/local/bin/
COPY --from=builder /usr/local/cargo/bin/sqlx /usr/local/bin/

# Copy migrations and DB wait script
COPY --from=builder /app/migrations /app/migrations
COPY wait-for-db.sh /usr/local/bin/wait-for-db.sh
RUN chmod +x /usr/local/bin/wait-for-db.sh

# Create non-root user
RUN useradd -m appuser
USER appuser
WORKDIR /home/appuser

EXPOSE 8000
ENTRYPOINT ["/usr/local/bin/wait-for-db.sh"]
CMD ["rust_mindset_backend"]
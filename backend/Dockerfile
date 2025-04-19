# Stage 1: build the Rust application and install sqlx-cli
FROM rust:1.86-slim as builder

RUN apt-get update && apt-get install -y \
    pkg-config \
    libssl-dev \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app
# Copy project files and migrations
COPY Cargo.toml Cargo.lock ./
COPY migrations ./migrations

# Install SQLx CLI for migrations
RUN cargo install sqlx-cli --no-default-features --features postgres

# Cache dependencies by building dummy main
RUN mkdir src \
  && echo "fn main() {println!(\"if you see this, the build broke\")}" > src/main.rs \
  && cargo build --release \
  && rm -rf src

# Copy real source and build release
COPY . .
RUN cargo build --release

# Stage 2: runtime image with tools for healthcheck
FROM rust:1.86-slim as runtime

RUN apt-get update && apt-get install -y \
    libssl-dev \
    ca-certificates \
    postgresql-client \
    netcat-openbsd \
  && rm -rf /var/lib/apt/lists/*

# Copy compiled binary, migrations, and SQLx CLI
COPY --from=builder /app/target/release/rust_mindset_backend /usr/local/bin/rust_mindset_backend
COPY --from=builder /app/migrations /app/migrations
COPY --from=builder /usr/local/cargo/bin/sqlx /usr/local/bin/sqlx

# Copy DB wait script
COPY wait-for-db.sh /usr/local/bin/wait-for-db.sh
RUN chmod +x /usr/local/bin/wait-for-db.sh

# Create non-root user
RUN useradd -m appuser
USER appuser
WORKDIR /home/appuser

EXPOSE 8000
ENTRYPOINT ["/usr/local/bin/wait-for-db.sh"]
CMD ["rust_mindset_backend"]
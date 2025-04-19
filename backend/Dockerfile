# Stage 1: build the Rust application
FROM rust:1.86-slim as builder

RUN apt-get update && apt-get install -y \
    pkg-config \
    libssl-dev \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY Cargo.toml Cargo.lock ./

# Build a dummy main to cache dependencies
RUN mkdir src \
  && echo "fn main() {println!(\"if you see this, the build broke\")}" > src/main.rs \
  && cargo build --release \
  && rm -rf src

# Copy the real source and build release
COPY . .
RUN cargo build --release

# Stage 2: use builder as runtime and install the binary into PATH
FROM builder as runtime

USER root
# Create non-root user and install binary
RUN useradd -m appuser \
  && install -Dm755 /app/target/release/rust_mindset_backend /usr/local/bin/rust_mindset_backend

USER appuser
WORKDIR /home/appuser

EXPOSE 8000
CMD ["rust_mindset_backend"]
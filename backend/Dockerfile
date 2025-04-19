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

# Stage 2: reuse builder as the runtime image to avoid extra pulls
FROM builder as runtime

# Create non-root user
USER root
RUN useradd -m appuser
USER appuser

# Expose the application port and start the binary
EXPOSE 8000
CMD ["rust_mindset_backend"]
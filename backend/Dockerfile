FROM rust

ADD . /src
WORKDIR /src

# accept the build argument
ARG DATABASE_URL

ENV DATABASE_URL=$DATABASE_URL

RUN cargo build

CMD cargo run

FROM ruby:3.0.0

WORKDIR /app/rails_articles_app

COPY Gemfile Gemfile.lock ./

RUN bundle install

COPY . .

CMD ["rails", "server", "-b", "0.0.0.0"]

# syntax = docker/dockerfile:1

# # Make sure RUBY_VERSION matches the Ruby version in .ruby-version and Gemfile
# ARG RUBY_VERSION=3.2.2
# FROM registry.docker.com/library/ruby:$RUBY_VERSION-slim as base

# # Install necessary system dependencies
# RUN apt-get update && apt-get install -y \
#     curl \
#     build-essential \
#     && rm -rf /var/lib/apt/lists/*

# # Install Bundler 2.5.6
# RUN gem install bundler:2.5.6

# # Rails app lives here
# WORKDIR /rails

# # Set production environment
# ENV RAILS_ENV="production" \
#     BUNDLE_DEPLOYMENT="1" \
#     BUNDLE_PATH="/usr/local/bundle" \
#     BUNDLE_WITHOUT="development"

# # Throw-away build stage to reduce size of final image
# FROM base as build

# # Copy Gemfile and Gemfile.lock
# COPY Gemfile Gemfile.lock ./

# # Install dependencies
# RUN bundle install

# # Install packages needed to build gems
# RUN apt-get update -qq && \
#     apt-get install --no-install-recommends -y build-essential git libvips pkg-config

# # Copy application code
# COPY . .

# # Adjust binfiles to be executable on Linux
# RUN chmod +x bin/* && \
#     sed -i "s/\r$//g" bin/* && \
#     sed -i 's/ruby\.exe$/ruby/' bin/*

# # Precompiling assets for production without requiring secret RAILS_MASTER_KEY
# # RUN SECRET_KEY_BASE_DUMMY=1 ./bin/rails assets:precompile

# # Final stage for app image
# FROM base

# # Install packages needed for deployment
# RUN apt-get update -qq && \
#     apt-get install --no-install-recommends -y curl libsqlite3-0 libvips && \
#     rm -rf /var/lib/apt/lists /var/cache/apt/archives

# # Copy built artifacts: gems, application
# COPY --from=build /usr/local/bundle /usr/local/bundle
# COPY --from=build /rails /rails

# # Entrypoint prepares the database.
# ENTRYPOINT ["/rails/bin/docker-entrypoint"]

# # Start the server by default, this can be overwritten at runtime
# EXPOSE 4000 
# CMD ["./bin/rails", "server", "-b", "0.0.0.0"] 

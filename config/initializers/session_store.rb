# Be sure to restart your server when you modify this file.

# Your secret key for verifying cookie session data integrity.
# If you change this key, all old sessions will become invalid!
# Make sure the secret is at least 30 characters and all random, 
# no regular words or you'll be exposed to dictionary attacks.
ActionController::Base.session = {
  :key         => '_siteswapgame_session',
  :secret      => 'da436c19b442e5491623fc4587546e2ce5174bd14701bded2fbbe24b69ecf58e25be01364aa6528db507973de27b2ae90a27338948522085f06404961d67cd52'
}

# Use the database for sessions instead of the cookie-based default,
# which shouldn't be used to store highly confidential information
# (create the session table with "rake db:sessions:create")
# ActionController::Base.session_store = :active_record_store

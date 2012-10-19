Rails.application.config.generators do |g|
  g.test_framework false # :rspec, :fixture => true, :routing_specs => false, :helper_specs => false, :integration_specs => false
  # g.form_builder :simple_form
  g.stylesheets false
  g.javascripts false
  g.helper false
end

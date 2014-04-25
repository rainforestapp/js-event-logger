require 'bundler/setup'
require 'rack/file'
require 'capybara/rspec'

Capybara.app = Rack::File.new(File.join(File.dirname(__FILE__), 'fixtures'))
include Capybara::DSL
 
describe "Example page", :type => :request do
  it "contains an H1 with text 'Hello World!'" do
    visit '/example.html'
    page.should have_css 'h1', :text => 'Hello World!'
  end
end
require 'bundler/setup'
require 'rack/file'
require 'capybara/rspec'
require 'capybara-webkit'

Capybara.app = Rack::File.new(File.join(File.dirname(__FILE__), 'fixtures'))
Capybara.javascript_driver = :webkit

include Capybara::DSL

RSpec::Matchers.define :have_event do |event_name, options = {}|
  match do |queue|
    

    !queue.nil? && queue.any? do |el|
      el.type == event_name
    end
  end
end


describe "Test Page", :type => :request, :js => true do
  describe "example page" do
    it "contains an H1 with text 'Hello World!'" do
      visit '/example.html'
      page.should have_css 'h1', :text => 'Hello World!'
    end
  end

  describe "Delayed Render" do
    it "tracks the click to new elements" do
      visit '/delayed-render/index.html'
      find(".foo").click
      sleep 1
      find(".bar").click

      event_queue.should have_event("click", on: ".foo")
      event_queue.should have_event("click", on: ".bar")
    end
  end

  def event_queue
    page.driver.evaluate_script("window.__secret_queue__")
  end
end


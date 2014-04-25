require 'bundler/setup'
require 'rack/file'
require 'capybara/rspec'
require 'capybara-webkit'

Bundler.require()

Capybara.app = Rack::File.new(File.join(File.dirname(__FILE__), '..'))
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
  let(:url) { File.join("/spec/fixtures/", page_name, "index.html") }

  describe "Simple HTML" do
    let(:page_name) { 'simple-html' }

    it "tracks the click to new elements" do
      visit url
      find(".foo").click
      find(".bar").click

      event_queue.should have_event("click", on: ".foo")
      event_queue.should have_event("click", on: ".bar")
    end
  end

  def event_queue
    page.driver.evaluate_script("window.my_secret_queue")
  end
end


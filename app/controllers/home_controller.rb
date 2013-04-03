class HomeController < ApplicationController
	skip_load_and_authorize_resource
	 skip_before_filter :authenticate_user!
  def index
    #@json = Location.all.to_gmaps4rails
    
  end

end

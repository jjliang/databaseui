class ApplicationController < ActionController::Base

	protect_from_forgery
	before_filter :authenticate_user!
	before_filter do |controller|
  controller.class.cancan_resource_class.new(controller).load_and_authorize_resource 			unless [controller.class == Devise::SessionsController, 
  	controller.class == Devise::RegistrationsController]
	end

	
	helper_method :all
	
	
      rescue_from CanCan::AccessDenied do |exception|
    redirect_to root_url, :alert => exception.message
	end
end

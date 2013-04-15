class ApplicationController < ActionController::Base
	protect_from_forgery
	before_filter :authenticate_user!
	before_filter do |controller|
  controller.class.cancan_resource_class.new(controller).load_and_authorize_resource 			unless [controller.class == Devise::SessionsController, 
  	controller.class == Devise::RegistrationsController]
	end

	# Helper method for projects
	helper_method :current_project

  private
    def current_project(project_id)
      @current_project ||= Project.find(project_id)
    end

	# Helper method to disply users
	helper_method :owner_user
		def owner_user(id)
			@owner_user ||= User.find(id)
		end
		
    rescue_from CanCan::AccessDenied do |exception|
    redirect_to root_url, :alert => exception.message
  end
end

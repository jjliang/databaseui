module ApplicationHelper

	
private
	# Helper method for projects
  def current_project(project_id)
    @current_project ||= Project.find(project_id)
  end

	# Helper method to disply users
	def owner_user(id)
		@owner_user ||= User.find(id)
	end
  
	# Helper method to disply functional groups
	def functional_name(id)
		@functional_name ||= FunctionalGroup.find(id)
	end
end


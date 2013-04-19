class DashboardController < ApplicationController
 
 def index
 		## For all users
		@users = User.all
    ##For non approved user list
   @userlist = User.where(["project_id = ?",current_user.project_id] && ["approved = false"]).all
 
  @location_datum = LocationDatum.new
  @author = Author.new
  @authorlist = Author.all
  @citation = Citation.new
  @citationlist = Citation.all
  @node = Node.new
  @non_iti = NonIti.new
  @nodelist = Node.all


		#Projects
		@project = Project.new
		@projectlist = Project.all
   ##For google maps
    #Code for generating polygons
	counter = 0
	#Users and project lead can only see regions belonging to their project
	if current_user.role == 'user' || 'lead'	
		@polygons = Array.new(LocationDatum.where(["project_id = ?",current_user.project_id]).count) { Array.new }
		LocationDatum.where(["project_id = ?",current_user.project_id]).find_each do |location|
		location.latitude.each_index do |index|
		@polygons[counter] << { :lat => location.latitude[index], :lng =>location.longitude[index]}

		end
		counter += 1
		end  
	else
		@polygons = Array.new(LocationDatum.count) { Array.new }
		LocationDatum.find_each do |location|
			location.latitude.each_index do |index|
			@polygons[counter] << { :lat => location.latitude[index], :lng =>location.longitude[index]}

			end
		counter += 1
		end  
	end

		@polygons2 = Array.new(@polygons)	
		@polygons = @polygons.to_json
		@polygons2 = @polygons2.to_json
		respond_to do |format|
		format.html
		format.json { render json: @polygons }   
		format.json { render json: @polygons2 }   
		end	

end
 

  
end
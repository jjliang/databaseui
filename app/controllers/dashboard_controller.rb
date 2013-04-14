class DashboardController < ApplicationController
 
 def index
    ##For non approved user list
   @userlist = User.where(["project_id = ?",current_user.project_id] && ["approved = false"]).all
   counter = 0

   ##For google maps
    #Code for generating polygons
	counter = 0
	#User can only see regions belonging to their project
	if current_user.role == 'user'	
		@polygons = Array.new(LocationData.where(["project_id = ?",current_user.project_id]).count) { Array.new }
		LocationData.where(["project_id = ?",current_user.project_id]).find_each do |location|
		location.latitude.each_index do |index|
		@polygons[counter] << { :lat => location.latitude[index], :lng =>location.longitude[index]}
			
		end
		counter += 1
		end  
	else
		@polygons = Array.new(LocationData.count) { Array.new }
		LocationData.find_each do |location|
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
  
  def dataentry
  @author = Author.new
  @authorlist = Author.all
  @citation = Citation.new
  @citationlist = Citation.all
  @node = Node.new
  @non_iti = NonIti.new
  @nodelist = Node.all

  end

  
end

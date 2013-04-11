class DashboardController < ApplicationController
 
 def index
   @userlist = User.all
   counter = 0
    LocationData.find_each do |location|
    
    @polygons = Array.new(LocationData.count,Array.new)

    location.latitude.each_index do |index|
    @polygons[counter] << { :lat => location.latitude[index], :lng =>location.longitude[index]}
    end
    counter = counter + 1
        end
    
    
    @polygons = @polygons.to_json
    respond_to do |format|
    format.html
    format.json { render json: @polygons }   

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

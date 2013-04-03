class DashboardController < ApplicationController
 
 def index
  @cities = City.all
  @json = @cities.to_gmaps4rails do |city, marker|
  marker.infowindow render_to_string(:partial => "/cities/infowindow", :locals => { :city => city})
    marker.title "#{city.name}"
    marker.json({ :population => city.population})
    marker.picture({:picture => "http://mapicons.nicolasmollet.com/wp-content/uploads/mapicons/shape-default/color-3eab71/shapecolor-color/shadow-1/border-dark/symbolstyle-contrast/symbolshadowstyle-dark/gradient-iphone/mushroom.png",
                    :width => 32,
                    :height => 32})
  end
end
  
  def dataentry
  @author = Author.new
  @authorlist = Author.all
  @citation = Citation.new
  @citationlist = Citation.all
  @node = Node.new
  @non_iti = Non_Iti.new
  @nodelist = Node.all
  end

  
end

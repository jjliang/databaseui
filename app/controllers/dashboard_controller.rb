class DashboardController < ApplicationController
 
 def index
  @locations = LocationData.all
  @json = @locations.to_gmaps4rails do |location, marker|
  marker.infowindow render_to_string(:partial => "/locatio_ndata/infowindow", :locals => { :location => location})
    marker.title "#{location.name}"
    marker.json({ :name => location.name})
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
  @non_iti = NonIti.new
  @nodelist = Node.all
  end

  
end

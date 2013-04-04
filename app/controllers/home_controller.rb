class HomeController < ApplicationController
	skip_load_and_authorize_resource
	 skip_before_filter :authenticate_user!
  def index
    @locations = LocationData.all
    @json = @locations.to_gmaps4rails do |location, marker|
      marker.infowindow render_to_string(:partial => "/location_data/infowindow", :locals => { :location => location})
      marker.title "#{location.name}"
      marker.json({ :name => location.name})
      marker.picture({:picture => "http://mapicons.nicolasmollet.com/wp-content/uploads/mapicons/shape-default/color-3eab71/shapecolor-color/shadow-1/border-dark/symbolstyle-contrast/symbolshadowstyle-dark/gradient-iphone/mushroom.png",
                      :width => 32,
                      :height => 32})
    end
    
  end

end

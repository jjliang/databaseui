class LocationDatum < ActiveRecord::Base
  serialize :latitude
  serialize :longitude
  acts_as_gmappable :process_geocoding => false
  attr_accessible :latitude,:longitude, :location_id,:name , :user_id, :project_id, :mod, :approved
  belongs_to :location
  belongs_to :user
  belongs_to :project
  def gmaps4rails_address
    "#{name},#{latitude},#{longitude}"
  end
  #def gmaps4rails_infowindow
   # "<h1>#{self.name}</h1>"
  #end
end

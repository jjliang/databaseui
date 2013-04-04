class LocationData < ActiveRecord::Base
  acts_as_gmappable :process_geocoding => false
  attr_accessible :latitude,:longitude, :location_id,:name
  belongs_to :location
  belongs_to :user
  def gmaps4rails_address
    "#{name}"
  end
end

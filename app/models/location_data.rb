class LocationData < ActiveRecord::Base
  attr_accessible :lat, :location_id, :lon
  belongs_to :location
end

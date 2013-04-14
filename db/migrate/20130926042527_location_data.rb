class LocationData < ActiveRecord::Migration
   def change
    drop_table :location_data do |t|
      t.float :latitude
      t.float :longitude
      t.integer :location_id
      t.string :name
	end

    create_table :location_data do |t|
      t.text :latitude
      t.text :longitude
      t.integer :location_id
      t.string :name
      t.integer :user_id
      t.integer :project_id
      t.boolean :mod
      t.boolean :approved
    end
  end

end

class CreateLocationData < ActiveRecord::Migration
  def change
    create_table :location_data do |t|
      t.float :latitude
      t.float :longitude
      t.integer :location_id
      t.string :name

      t.timestamps
    end
  end
end

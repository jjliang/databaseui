class CreateLocationData < ActiveRecord::Migration
  def change
    create_table :location_data do |t|
      t.integer :location_id
      t.float :lat
      t.float :lon

      t.timestamps
    end
  end
end

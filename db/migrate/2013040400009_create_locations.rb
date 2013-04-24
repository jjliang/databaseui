class CreateLocations < ActiveRecord::Migration
  def change
  	create_table :locations do |t|
  		t.string :name
  		t.integer :left
  		t.integer :right
  		t.integer :parent
  		t.boolean :active
  		t.boolean :visible
  		t.integer :zoom_min
  		t.integer :zoom_max
  		t.integer :z_index
  		t.integer :user_id
  		t.integer :project_id
  		t.boolean :mod
  		t.boolean :approved
  	
  		t.timestamps
  	end
  end
end

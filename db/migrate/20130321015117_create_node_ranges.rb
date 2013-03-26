class CreateNodeRanges < ActiveRecord::Migration
  def change
    create_table :node_ranges do |t|
      t.integer :citation_id
      t.integer :node_id
      t.integer :location_n_id
      t.integer :location_s_id
      t.text :comment
      t.string :datum
      t.integer :user_id

      t.timestamps
    end
  end
end

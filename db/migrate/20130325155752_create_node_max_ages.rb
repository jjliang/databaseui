class CreateNodeMaxAges < ActiveRecord::Migration
  def change
    create_table :node_max_ages do |t|
      t.integer :citation_id
      t.integer :node_id
      t.float :max_age
      t.text :comment
      t.string :datum
      t.integer :user_id

      t.timestamps
    end
  end
end

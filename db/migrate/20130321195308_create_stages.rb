class CreateStages < ActiveRecord::Migration
  def change
    create_table :stages do |t|
      t.integer :node_id
      t.integer :user_id

      t.timestamps
    end
  end
end

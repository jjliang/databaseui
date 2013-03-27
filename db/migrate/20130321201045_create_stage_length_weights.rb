class CreateStageLengthWeights < ActiveRecord::Migration
  def change
    create_table :stage_length_weights do |t|
      t.integer :citation_id
      t.integer :stage_id
      t.float :a
      t.float :b
      t.text :comment
      t.string :datum
      t.integer :user_id

      t.timestamps
    end
  end
end

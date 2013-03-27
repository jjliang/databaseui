class CreateStageUnassimilatedConsumRatios < ActiveRecord::Migration
  def change
    create_table :stage_unassimilated_consum_ratios do |t|
      t.integer :citation_id
      t.integer :stage_id
      t.float :unassimilated_consum_ratio
      t.text :comment
      t.string :datum
      t.integer :user_id

      t.timestamps
    end
  end
end
class CreateStageProdBiomassRatios < ActiveRecord::Migration
  def change
    create_table :stage_prod_biomass_ratios do |t|
      t.integer :citation_id
      t.integer :stage_id
      t.float :prod_biomass_ratio
      t.text :comment
      t.string :datum
      t.integer :user_id

      t.timestamps
    end
  end
end

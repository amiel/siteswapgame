class CreateScores < ActiveRecord::Migration
  def change
    create_table :scores do |t|
      t.string :name
      t.integer :points
      t.integer :time

      t.timestamps
    end
  end
end

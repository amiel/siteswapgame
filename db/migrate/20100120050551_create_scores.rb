class CreateScores < ActiveRecord::Migration
  def self.up
    create_table :scores do |t|
      t.string :name
      t.integer :score
      t.integer :time

      t.timestamps
    end
  end

  def self.down
    drop_table :scores
  end
end

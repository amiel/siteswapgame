class Score < ActiveRecord::Base
  attr_accessible :name, :points, :time

  def self.scoreboard
    to_select = <<-SQL
      id,
      name,
      points,
      time,
      created_at,
      points/(time*1.0)*60 as points_per_minute,
      points*points/(time*1.0)*100 as score
    SQL

    select(to_select).order('score DESC').where('time IS NOT NULL AND time != 0 AND points != 0')
  end
end

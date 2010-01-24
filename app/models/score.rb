class Score < ActiveRecord::Base
  def self.scoreboard
    # all :order => 'score ASC, time ASC'
    select = <<-SQL
      id,
      name,
      points,
      time,
      points/(time*1.0)*60 as points_per_minute,
      points*points/(time*1.0)*100 as score
    SQL
    
    all :select => select, :order => 'score DESC'
  end
end
class SeatService
  attr_accessor :columns, :rows, :seats, :row_names
  def initialize(details)
    self.columns = details["venue"]["layout"]["columns"].to_i
    self.rows = details["venue"]["layout"]["rows"].to_i
    self.seats = details["seats"] 
    self.row_names = ('a'..'z').to_a
  end

  def self.seat_filter(details)
    obj = new(details)
    obj.get_sorted_seats
  end

  # Return middle value of row
  def get_middle_value
    (columns / 2) + 1
  end

  # Return sorted seats with different to front and middle seat
  def set_difference_seats
    sorted_seats = []
    seats.each do |key, value|
      sorted_seats << merge_difference(value)
    end
    sorted_seats
  end
  
  # Return value with difference
  def merge_difference(value)
    value.merge({difference: find_difference(value["row"], value["column"])})
  end

  # Return seat difference from middle and front
  def find_difference(row, column)
    row_names.find_index(row) + (get_middle_value - (column).to_i).abs
  end

  # Return sorted seats close to front and middle
  def get_sorted_seats
    set_difference_seats.sort_by{ |v| [v[:difference], v["row"].to_i, v["column"].to_i] }
  end
end
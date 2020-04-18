class SeatService
  attr_accessor :columns, :rows, :seats
  def initialize(details)
    self.columns = details["venue"]["layout"]["columns"].to_i
    self.rows = details["venue"]["layout"]["rows"].to_i
    self.seats = details["seats"] 
    @rows = ('a'..'z').to_a
  end

  def self.seat_filter(details)
    obj = new(details)
    mid_value = obj.get_middle_value(obj.columns)
    sorted_seats = obj.set_difference_seats(obj.seats, mid_value)
    obj.get_sorted_seats(sorted_seats)
  end

  # Return middle value of row
  def get_middle_value(columns)
    (columns / 2) + 1
  end

  # Return sorted seats with different to front and middle seat
  def set_difference_seats(seats, mid_value)
    sorted_seats = []
    seats.each do |key, value|
      difference = find_difference(value["row"], mid_value, value["column"])
      sorted_seats << value.merge({difference: difference})
    end
    sorted_seats
  end

  # Return seat difference from middle and front
  def find_difference(row, column, mid_value)
    @rows.find_index(row) + (mid_value - (column).to_i).abs
  end

  # Return sorted seats close to front and middle
  def get_sorted_seats(sorted_seats)
    sorted_seats.sort_by{ |v| [v[:difference], v["row"].to_i, v["column"].to_i] }
  end
end
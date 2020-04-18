class SeatService
  def initialize
    @rows = ('a'..'z').to_a
  end

  def seat_filter(details)
    sorted_seats = []
    mid_value = ((details["venue"]["layout"]["columns"]).to_i / 2) + 1
    details["seats"].each do |key, value|
      difference = @rows.find_index((value["row"])) + (mid_value - (value["column"]).to_i).abs
      sorted_seats << value.merge({difference: difference})
    end
    sorted_seats.sort_by{ |v| [v[:difference], v["row"].to_i, v["column"].to_i] }
  end
end
require 'rails_helper'

RSpec.describe SeatService, type: :service do
  let(:details) { 
    {
      "venue": {
        "layout": {
            "rows": 10,
            "columns": 50
        }
      },
      "seats": {
        "a1": {
            "id": "a1",
            "row": "a",
            "column": 1,
            "status": "AVAILABLE"
        },
        "b5": {
            "id": "b5",
            "row": "b",
            "column": 5,
            "status": "AVAILABLE"
        },
        "h7": {
            "id": "h7",
            "row": "h",
            "column": 7,
            "status": "AVAILABLE"
        }
      }
    }
   }

  describe "#custom order Service methods" do
    it "Order Best seat" do
      response = SeatService.new.seat_filter(details.as_json)
      expect(response.class).to eq (Array)
    end
  end
end


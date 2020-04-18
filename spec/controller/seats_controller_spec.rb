require 'rails_helper'

RSpec.describe SeatsController, type: :controller do
  let(:detail) { 
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
  
  # Routes
  describe 'Routes' do
    it { expect(get: '/seats').to route_to({ controller: 'seats', action: 'index' }) }
  end
  
  describe 'List all seats' do
    describe "#index", search: true do
      it 'list all seats ' do
        get :index, params: {detail: detail.to_json}
        expect(response.status).to be 200
      end
    end
  end
end

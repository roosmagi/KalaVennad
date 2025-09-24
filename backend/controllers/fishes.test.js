const fishController = require("./fishes");
const Fish = require("../models/fish");

jest.mock("../models/fish");

const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("fishController", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getOneFish", () => {
    it("tagastab kala id järgi", async () => {
      const req = { params: { fishId: 1 } };
      const res = mockRes();

      const fakeFish = { id: 1, name: "Lõhe" };
      Fish.findOne.mockResolvedValue(fakeFish);

      await fishController.getOneFish(req, res);

      expect(Fish.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Got fish by id",
        fish: fakeFish,
      });
    });
  });

  describe("getAllFishes", () => {
    it("tagastab kõik kalad", async () => {
      const req = {};
      const res = mockRes();

      const fakeFishes = [
        { id: 1, name: "Lõhe" },
        { id: 2, name: "Forell" },
      ];
      Fish.findAll.mockResolvedValue(fakeFishes);

      await fishController.getAllFishes(req, res);

      expect(Fish.findAll).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ fishes: fakeFishes });
    });
  });

  describe("addFish", () => {
    it("lisab uue kala ja tagastab id", async () => {
      const req = {
        body: {
          name: "Haug",
          description: "Jõekala",
          place: "Peipsi",
          c_time: "2025-09-22",
        },
        file: { filename: "haug.png" },
        user: { id: 99 },
      };
      const res = mockRes();

      const fakeFish = { id: 123, ...req.body };
      Fish.create.mockResolvedValue(fakeFish);

      await fishController.addFish(req, res);

      expect(Fish.create).toHaveBeenCalledWith({
        name: "Haug",
        description: "Jõekala",
        place: "Peipsi",
        c_time: "2025-09-22",
        image: "haug.png",
        user_Id: 99,
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: "Fish is added",
        productId: 123,
      });
    });
  });
});

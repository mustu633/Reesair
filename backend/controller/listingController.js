import { ObjectId } from "mongodb";
import  path  from "path";
import fs from 'fs/promises';
import { fileURLToPath } from "url";
import Listing from "../models/listingModel.js";

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default{

    // For create new listing:
    async createListing(req, res){
        const {title, description, price, location, country} = req.body;
        const img = req.files ? req.files.img : null;
        const imgPath = img ? `uploads/${Date.now()}${path.extname(img.name)}` : null;

        try{
            const newListing = new Listing({title, img:imgPath, description, price, location, country});
            await newListing.save();
            if (img) {
                await img.mv(imgPath);
              }

            return res.status(201).json(newListing);
        }catch(error){
            if(error.name === "ValidationError"){
                const errors = Object.values(error.errors).map(err => ({ msg : err.message, path: err.path}));
                console.log(errors)

                return res.status(400).json({errors});

            }
            return res.status(500).json({errors: [{msg: error.message}] });
        }
    },

    //For Show all listing:
    async showListings(req, res){
        const listings = await Listing.find({});
        return res.json({data: listings});
    },

    //For Show single listing by id:
    async showListing(req, res){
        const {id} = req.params;

        if(!ObjectId.isValid(id)){
            return res.status(400).json({message: "Invalid Listing ID"});
        }
        const listing = await Listing.findById(id).populate('reviews').exec();
        // listing.populate("reviews");
        if(!listing){
            res.status(404).json({message: "Listing is not found!"});
        }
        // console.log(listing)
        res.status(200).json({data: listing});
    },

    //For Update the existing Listing:

    async editListing (req, res) {
        
        const {id} = req.params;
        
        const {title, description, price, location, country} = req.body;

        const img = req.files ? req.files.img : null;
        const imgPath = img ? `uploads/${Date.now()}${path.extname(img.name)}` : null;
        
        if(!ObjectId.isValid(id)){
            return res.status(400).json({message: "Invalid Listing ID"});
        }

        try{
            const existingListing = await Listing.findById(id);

            if(!existingListing){
                return res.status(404).json({message: "Listing not found"})
            }
            if (img) {
                if (existingListing.img) {
                  try {
                    await fs.unlink(path.join(__dirname, '..', existingListing.img));
                  } catch (err) {
                    console.error('Failed to delete old image:', err);
                  }
                }
          
                await img.mv(imgPath);
                existingListing.img = imgPath;
              }
            
            existingListing.title = title;
            existingListing.description = description;
            existingListing.price = price;
            existingListing.location = location;
            existingListing.country = country;

            await existingListing.save();

            return res.status(200).json({message: "Listing updated successfully!"})
        }catch(error){
            if(error.name === "ValidationError"){
                const errors = Object.values(error.errors).map(err => ({ msg : err.message, path: err.path}));

                return res.status(400).json({errors});

            }
            return res.status(500).json({errors: [{msg: error.message}] });
            
        }
    },

    //For Delete the existing Listing:
    async deleteListing(req, res){
        const {id} = req.params;
        
        if(!ObjectId.isValid(id)){
            res.status(400).json({message: "Your Listing id is invalid!"})
        }

        try{
            const existingListing = await Listing.findById(id);

                if (existingListing.img) {
                  try {
                    await fs.unlink(path.join(__dirname, '..', existingListing.img));
                  } catch (err) {
                    console.error('Failed to delete old file:', err);
                  }
              }
        
        const listing = await Listing.findByIdAndDelete(id);
        return res.status(200).json({message: "Listing deleted successfully!"});
    } catch(error){
        console.log('error in deleting Listing: ', error);
    }
}
    
}
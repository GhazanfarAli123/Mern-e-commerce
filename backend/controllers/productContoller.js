import express from "express";
import fs from "fs"
import productModal from "../modals/productModal.js";
import categoryModal from "../modals/categoryModal.js";
import slugify from "slugify";
import braintree from "braintree"
import orderModal from "../modals/orderModal.js";

var gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: "zbwj8y6c8w74x76c",
    publicKey: "mq43jd2k2gv3v3jb",
    privateKey: "f3d4f024c862d682c31d92f4c4e91bd4",
  });
  

export const createProductController = async (req, res) => {
    try {
        const { name, description, slug, price, category, shipping } = req.fields
        const { photo } = req.files

        switch (true) {
            case !name:
                res.send("name is required")
                break
            case !description:
                res.send("description is required")
                break

            case !price:
                res.send("price is required")
                break
            case !category:
                res.send("category is required")
                break
            case photo && photo.size > 10000000:
                res.send("photo is required and it should not be greater than 1000 ")
                break
        }

        const products = new productModal({ ...req.fields, slug: slugify(name) })
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path)
            products.contentType = photo.type
        }
        await products.save()
        res.send(products)

    } catch (err) {
        console.log(err)
        res.send(err)
    }
}

export const getProductsController = async (req, res) => {

    try {
        const product = await productModal.find({}).populate("category").select("-photo").limit(12).sort({ createAt: -1 })
        res.send(product)

    } catch (err) {
        res.send(err)
    }

}
export const getProductController = async (req, res) => {

    try {
        const product = await productModal.findOne({ slug: req.params.slug }).select("-photo").populate("category")
        res.send(product)

    } catch (err) {
        res.send(err)
    }

}

export const getProductPhotoController = async (req, res) => {
    try {
        const product = await productModal.findById(req.params.pid).select("photo");
        if (product.photo.data) {
            res.set("Content-Type", product.photo.contentType);

            res.send(product.photo.data);
        }
    } catch (err) {
        res.send(err);
    }
}


export const deleteProductController = async (req, res) => {
    try {
        const product = await productModal.findByIdAndDelete(req.params.pid).select("-photo");
        res.send(product)
    } catch (err) {
        res.send(err);
    }
}

export const updateProductController = async (req, res) => {
    try {
        const { name, description, slug, price, category, shipping } = req.fields
        const { photo } = req.files

        switch (true) {
            case !name:
                res.send("name is required")
                break
            case !description:
                res.send("description is required")
                break

            case !price:
                res.send("price is required")
                break
            case !category:
                res.send("category is required")
                break
            case photo && photo.size > 10000000:
                res.send("photo is required and it should not be greater than 1000 ")
                break
        }

        const product = await productModal.findByIdAndUpdate(req.params.pid, { ...req.fields, slug: slugify(name) }, { new: true });
        if (!product) {
            console.log(`Could not find product with ID ${req.params.pid}`);
            return res.send(`Could not find product with ID ${req.params.pid}`);
        }
        if (photo) {
            product.photo.data = fs.readFileSync(photo.path)
            product.contentType = photo.type
        }
        await product.save()
        res.send(product)

    } catch (err) {
        console.log(err)
        res.send(err)
    }
}


export const productFiltersController = async (req, res) => {
    try {
      const { checked, radio } = req.body;
      let args = {};
      if (checked.length > 0) args.category = checked;
      if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
      const products = await productModal.find(args);
      res.status(200).send({
        success: true,
        products,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        message: "Error WHile Filtering Products",
        error,
      });
    }
  };

  export const productCountController = async (req, res) => {
    try {
      const total = await productModal.find({}).estimatedDocumentCount();
      res.status(200).send({
        total,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        message: "Error in product count",
        error,
      });
    }
  };
  
export const productListController = async(req,res) =>{
    try{
        const perPage = 2
        const page = req.params.page ? req.params.page : 1
        const product = await productModal.find({}).select("-photo").skip((page-1) * perPage).limit(perPage).sort({createdAt : -1})
        res.send(product)

    }catch(err){
        console.log(err)
    }
}
export const searchProductController = async (req, res) => {
    try {
      const { keyword } = req.params;
      const resutls = await productModal
        .find({
          $or: [
            { name: { $regex: keyword, $options: "i" } },
            { description: { $regex: keyword, $options: "i" } },
          ],
        })
        .select("-photo");
      res.json(resutls);
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        message: "Error In Search Product API",
        error,
      });
    }
  };


export const similarProductController = async(req,res) => {
    try{    
         const {pid,cid} = req.params
         const products = await productModal.find({
            category:cid,
            _id:{$ne:pid}
         })
         .select("-photo")
         .limit(3)
         .populate("category")
         res.send(products)

    }catch(err){
        console.log(err)
    }
}

export const catgoryProductController = async(req,res) =>{
    try{
        const category = await categoryModal.findOne({slug:req.params.slug})
        const product = await productModal.find({category}).populate("category")
        res.send(product)

    }catch(err){
        console.log(err)
    }
}

export const  brainTreeTokenController = async(req,res) => {
    try{
        gateway.clientToken.generate({} , function(err,responce){
            if(err){
                res.status(500).send(err)
            }else{
                res.send(responce)
            }
        })
    }catch(err){
        console.log(err)
    }
}

export const braintreePaymentController = async (req, res) => {
    try {
      const { nonce, cart } = req.body;
      let total = 0;
      cart.map((i) => {
        total += i.price;
      });
      let newTransaction = gateway.transaction.sale(
        {
          amount: total,
          paymentMethodNonce: nonce,
          options: {
            submitForSettlement: true,
          },
        },
        function (error, result) {
          if (result) {
            const order = new orderModal({
              products: cart,
              payment: result,
              buyer: req.user._id,
            }).save();
            res.json({ ok: true });
          } else {
            res.status(500).send(error);
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
import mongoose from 'mongoose';

const ManagerSchema = new mongoose.Schema({
    key: String,
});

ManagerSchema.methods.findOrCreate = (key) => {
    return Manager.exists({ title }, (err, doc) => {
        if (err) {
            console.log(err);
        } else {
            if (doc === true) {
                return Manager.find({ title });
            } else {
                const manager = new Manager(key);
                manager.save()
                    .catch(err => {
                        console.log(err);
                    })
                return manager;
            }
        }
    });
}

ManagerSchema.methods.findAll = (type) => {
    return Manager.find({type});
}

const Manager = mongoose.model("Manager", BoardSchema);

export default Manager;


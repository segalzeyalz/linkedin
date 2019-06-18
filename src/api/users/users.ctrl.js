import UsersDa from "./users.da";

const getAll = (req, res) => {
  //checking if there is no parameter
  if (Object.keys(req.query).length === 0) {
    UsersDa.getAll()
      .then(users => res.status(200).json(users))
      .catch(() => res.sendStatus(422));
  } else {
    console.log(req.query)
    UsersDa.getFindUsers(req.query)
      .then(users => res.status(200).json(users))
      .catch(() => res.sendStatus(422));
  }
}

const getUser = (req, res) => {
  const {
    id
  } = req.params;
  UsersDa.getUser(id)
    .then(users => res.status(200).json(users))
    .catch(() => res.sendStatus(422));
}

const update = (req, res) => {
  const {
    id
  } = req.params;
  const {
    name,
    title,
    company,
    skills
  } = req.body;

  UsersDa.update(id, name, title, company, skills)
    .then(() => res.sendStatus(200))
    .catch(() => res.sendStatus(422));
}

function create(req, res) {
  console.log(req.body)
  const {
    name,
    title = '',
    company = '',
    skills = []
  } = req.body;
  UsersDa.create(name, title, company, skills)
    .then(user => res.status(200).json(user))
    .catch(() => res.sendStatus(422));
}

const remove = (req, res) => {
  const {
    id
  } = req.params;

  UsersDa.remove(id)
    .then(() => res.sendStatus(200))
    .catch(() => res.sendStatus(422));
}

export default {
  getAll,
  getUser,
  update,
  create,
  remove
};
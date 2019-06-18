import UsersDa from "./users.da";

const getAll = (req, res) => () => {
    UsersDa.getAll()
        .then(users => res.status(200).json(users))
        .catch(() => res.sendStatus(422));
}

const update = (req, res) => () => {
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

const create = (req, res) => () => {
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

function remove(req, res) {
  const {
    id
  } = req.params;

  UsersDa.remove(id)
    .then(() => res.sendStatus(200))
    .catch(() => res.sendStatus(422));
}

export default {
    getAll,
    update,
    create,
    remove
};
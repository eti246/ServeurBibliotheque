import e from 'express';
// But : Programmation des routes de l'api pour les categorie.
// Auteur :  Etienne Desrochers
// Date : 11 octobre 2020
// Mis à jour : 11 octobre 2020

// On import les modules.
import express from 'express';
import paginate from 'express-paginate';
import livreService from '../services/livresService.js';
// On fait le routage.
const router = express.Router();


class CategoriesRoutes
{
    //REGION Contructeur
    constructor()
    {
        //Retourn toutes les categories
        router.get('/',this.getAll);
    }
    //FIN REGION

    //Function qui retourne tout les categories
    async getAll(req, res, next)
    {
        try
        {
            // on va récupérer les livre et le nombre de livre
            let [livre, itemsCount] = await livreService.retrieveByCriteria({},{});

            //Variable qui va contenir les categories
            let contentCategorie = []
            let temp = []
            //Pour chaque livre
            livre.forEach(t => 
            {
                //On valide que la catégorie n'est pas déjas dans la liste
                if(!temp.includes(t.categorie))
                {
                    temp.push(t.categorie)
                    // On Ajoute la categorie
                    contentCategorie.push({"NomCategorie":t.categorie})
                }
            })
            //On envois un code de succes et les categories
            res.status(200).json(contentCategorie);
        }

        catch (err)
        {
            //Retour de l'erreur
             return next(err);
        }
        
    }
}
new CategoriesRoutes();

export default router;


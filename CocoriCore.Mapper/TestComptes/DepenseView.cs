namespace CocoriCore.Mapper.Comptes
{
    class DepenseView : IJoin<Depense, Poste>
    {
        public TypedId<Depense> Id { get; set; }
        public TypedId<Poste> IdPoste;
        public string NomPoste;
        public string Description;
        public double Montant;
    }
}
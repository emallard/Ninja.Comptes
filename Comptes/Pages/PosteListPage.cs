using System;
using System.Linq;
using CocoriCore;
using CocoriCore.Page;

namespace Comptes
{
    public class PosteListPageQuery : IPageQuery<PosteListPage>
    {
    }

    public class PosteListPage : PageBase<PosteListPageQuery>
    {
        public PosteCreatePageQuery NouveauPoste;
        public AsyncCall<PosteListQuery, PageLink<PosteViewPageQuery>[]> Postes;
    }

    /*
        public class PosteListPageItem
        {
            public PosteViewPageQuery Lien;
            public PosteListResponseItem Poste;
        }
    */
    public class PosteListPageModule : PageModule
    {
        public PosteListPageModule()
        {
            this.HandlePage<PosteListPageQuery, PosteListPage>()
                //.ForAsyncCall(p => p.Postes)
                .ForAsyncCall<PosteListQuery>()
                .MapResponse<PosteListResponseItem[]>()
                .ToModel<PageLink<PosteViewPageQuery>[]>((q, r) => r.Select(x => new PageLink<PosteViewPageQuery>(
                    new PosteViewPageQuery { Id = x.Id },
                    x.Nom
                )).ToArray());
        }
    }
}
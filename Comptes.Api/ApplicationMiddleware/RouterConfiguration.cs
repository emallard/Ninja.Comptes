using System;
using System.Threading.Tasks;
using CocoriCore;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using Comptes;
using CocoriCore.Router;

namespace Comptes.Api
{

    public class RouterConfiguration
    {

        public static RouterOptions Options()
        {
            var builder = new RouterOptionsBuilder();




            builder.Post<Call>().SetPath("api/call").UseBody();
            builder.Get<HtmlMessage>().SetPath("api/page").UseQuery();
            builder.Get<FavIconMessage>().SetPath("favicon.ico").UseQuery();
            builder.Get<Tests_GET>().SetPath("api/tests");
            builder.Get<Tests_Id_GET>().SetPath(x => $"api/tests/{x.Type}/{x.TestName}").UseQuery();

            builder.Get<Graph_GET>().SetPath("api/graph").UseQuery();

            return builder.Options;
        }
    }
}
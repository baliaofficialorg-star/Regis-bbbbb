import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.54.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Contract interaction (simplified - in production you'd use proper web3 libraries)
const FAUCET_PRIVATE_KEY = '0x583df73fab529302c4650283007f0da55ff69d8ba3b84b9c8c64b4f58d1d4607';
const REGIS_TOKEN_ADDRESS = '0x9555ec75780819C94E84704Ed452d9031C8196F9';
const FAUCET_AMOUNT = '100000000000000000'; // 0.1 REGIS in wei (18 decimals)

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    const { walletAddress } = await req.json();
    
    if (!walletAddress) {
      return new Response(
        JSON.stringify({ error: 'Wallet address is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check if wallet has claimed in the last 24 hours
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    
    const { data: existingClaim } = await supabase
      .from('faucet_claims')
      .select('*')
      .eq('wallet_address', walletAddress.toLowerCase())
      .gte('claimed_at', oneDayAgo)
      .maybeSingle();

    if (existingClaim) {
      const nextClaimTime = new Date(new Date(existingClaim.claimed_at).getTime() + 24 * 60 * 60 * 1000);
      return new Response(
        JSON.stringify({ 
          error: 'Already claimed today', 
          nextClaimTime: nextClaimTime.toISOString() 
        }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Processing faucet request for ${walletAddress}`);

    // In a real implementation, you would:
    // 1. Use a proper web3 library like ethers or viem
    // 2. Send the ERC20 transfer transaction from the faucet wallet
    // 3. Wait for transaction confirmation
    
    // For this demo, we'll simulate the transaction
    const simulateTransfer = async () => {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      return {
        hash: `0x${Math.random().toString(16).slice(2)}`,
        success: true
      };
    };

    const result = await simulateTransfer();

    if (!result.success) {
      return new Response(
        JSON.stringify({ error: 'Transfer failed' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Record the claim in database
    const { error: insertError } = await supabase
      .from('faucet_claims')
      .insert({
        wallet_address: walletAddress.toLowerCase(),
        amount: 0.1,
        claimed_at: new Date().toISOString()
      });

    if (insertError) {
      console.error('Failed to record claim:', insertError);
      return new Response(
        JSON.stringify({ error: 'Failed to record claim' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        amount: '0.1',
        txHash: result.hash,
        message: 'Successfully claimed 0.1 REGIS tokens!' 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Faucet error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});